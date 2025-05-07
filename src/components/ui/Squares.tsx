import React, { useEffect, useRef } from 'react';

interface SquaresProps {
  speed?: number;
  squareSize?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  borderColor?: string;
  hoverFillColor?: string;
}

const Squares: React.FC<SquaresProps> = ({
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#fff',
  hoverFillColor = '#222'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 创建方块数组
    let squares: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      dx: number;
      dy: number;
    }> = [];

    // 根据方向设置移动方向
    const getDirection = () => {
      switch (direction) {
        case 'up': return { dx: 0, dy: -1 };
        case 'down': return { dx: 0, dy: 1 };
        case 'left': return { dx: -1, dy: 0 };
        case 'right': return { dx: 1, dy: 0 };
        case 'diagonal': return { dx: 1, dy: 1 };
        default: return { dx: 1, dy: 1 };
      }
    };

    const { dx, dy } = getDirection();

    // 初始化方块
    const initSquares = () => {
      squares = []; // 清空现有方块
      // 增加额外的方块以确保覆盖整个视口
      const cols = Math.ceil(canvas.width / squareSize) + 2;
      const rows = Math.ceil(canvas.height / squareSize) + 2;

      for (let i = -2; i < cols; i++) {
        for (let j = -2; j < rows; j++) {
          squares.push({
            x: i * squareSize,
            y: j * squareSize,
            size: squareSize,
            speed: speed,
            dx,
            dy
          });
        }
      }
    };

    // 设置canvas尺寸为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSquares(); // 重新初始化方块
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    initSquares();

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      squares.forEach(square => {
        // 更新位置
        square.x += square.speed * square.dx;
        square.y += square.speed * square.dy;

        // 边界检查 - 修改边界条件以确保无缝连接
        if (square.x > canvas.width + square.size) square.x = -square.size * 2;
        if (square.x < -square.size * 2) square.x = canvas.width + square.size;
        if (square.y > canvas.height + square.size) square.y = -square.size * 2;
        if (square.y < -square.size * 2) square.y = canvas.height + square.size;

        // 绘制方块 - 确保方块完全覆盖其区域
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(
          Math.floor(square.x),
          Math.floor(square.y),
          square.size,
          square.size
        );
      });

      requestAnimationFrame(animate);
    };

    animate();

    // 鼠标悬停效果
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      squares.forEach(square => {
        if (
          mouseX > square.x &&
          mouseX < square.x + square.size &&
          mouseY > square.y &&
          mouseY < square.y + square.size
        ) {
          ctx.fillStyle = hoverFillColor;
          ctx.fillRect(square.x, square.y, square.size, square.size);
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed, squareSize, direction, borderColor, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ 
        opacity: 0.1,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10
      }}
    />
  );
};

export default Squares;
