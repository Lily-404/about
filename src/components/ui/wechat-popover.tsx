import { MessageCircle } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function WechatPopover() {
  const [copied, setCopied] = useState(false);
  const wechatId = "OOIll0";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="hover:scale-110 transition-transform hover:bg-primary hover:text-primary-foreground"
          aria-label="WeChat"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">WeChat</h4>
            <p className="text-sm text-muted-foreground">
              扫描二维码或复制微信号添加
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/wechat-qr.jpg" // 需要添加你的微信二维码图片
              alt="WeChat QR Code"
              className="w-48 h-48 object-cover rounded-lg"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{wechatId}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="h-8"
              >
                {copied ? "已复制" : "复制"}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 