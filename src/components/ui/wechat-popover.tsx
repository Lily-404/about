import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MessageCircle, Copy, Check } from 'lucide-react';
import { logEvent, EventCategories, EventActions } from '@/lib/analytics';

interface WechatPopoverProps {
  children?: React.ReactNode;
}

export function WechatPopover({ children }: WechatPopoverProps) {
  const [copied, setCopied] = useState(false);
  const wechatId = 'OOIll0';

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    logEvent(
      EventCategories.SOCIAL,
      EventActions.COPY,
      'WeChat ID'
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQRView = () => {
    logEvent(
      EventCategories.SOCIAL,
      EventActions.VIEW,
      'WeChat QR Code'
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild onClick={handleQRView}>
        {children || (
          <Button
            variant="outline"
            className="w-full justify-start"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WeChat
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src="/wechat-qr.jpg"
              alt="WeChat QR Code"
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">WeChat ID:</span>
            <div className="flex items-center gap-2">
              <code className="text-sm">{wechatId}</code>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 