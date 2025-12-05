import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CollapsibleWebBanner() {
    const [isOpen, setIsOpen] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans",
            isOpen ? "h-[140px] md:h-[120px]" : "h-[40px]"
        )}>
            {/* Expanded State */}
            <div className={cn(
                "absolute inset-0 bg-background border-t border-border shadow-2xl transition-transform duration-300 flex flex-col items-center justify-center p-4",
                isOpen ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-muted"
                        onClick={() => setIsOpen(false)}
                    >
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Minimize Ad</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full hover:bg-muted text-muted-foreground"
                        onClick={() => setIsVisible(false)}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close Ad</span>
                    </Button>
                </div>

                {/* Ad Content Placeholder */}
                <div className="w-full h-full max-w-[728px] max-h-[90px] bg-muted/30 border border-dashed border-border rounded flex items-center justify-center">
                    <div className="text-center">
                        <span className="text-xs font-mono text-muted-foreground block">Advertisement</span>
                        <span className="text-sm font-bold text-primary">728x90 Leaderboard Ad</span>
                    </div>
                </div>
            </div>

            {/* Minimized / Toggle State */}
            <div className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 bg-background border border-b-0 border-border rounded-t-lg shadow-lg px-4 py-1 flex items-center gap-2 cursor-pointer transition-transform duration-300",
                isOpen ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
            )}
                onClick={() => setIsOpen(true)}
            >
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Show Ad</span>
                <ChevronUp className="h-4 w-4 text-primary" />
            </div>

        </div>
    );
}
