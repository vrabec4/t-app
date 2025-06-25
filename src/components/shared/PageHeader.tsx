import { cn } from '@/lib/utils/utils';

import { TypographyH1, TypographyMuted } from '@/components/ui/typography';

type Props = {
  title: string;
  description?: string;
  className?: string;
  sticky?: boolean;
};

export function PageHeader({
  title,
  description,
  className,
  sticky = true,
}: Props) {
  return (
    <div
      className={cn(
        'py-6 mb-8',
        sticky &&
          'sticky top-0 z-40 pt-4 pb-3 bg-white shadow-sm backdrop-blur-sm border-b',
        className
      )}
    >
      <div className="text-center mb-4">
        <TypographyH1 className="text-2xl md:text-3xl font-bold mb-3">
          {title}
        </TypographyH1>
        {description && (
          <TypographyMuted className="text-base max-w-xl mx-auto">
            {description}
          </TypographyMuted>
        )}
      </div>
    </div>
  );
}
