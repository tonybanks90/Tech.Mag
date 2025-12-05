import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

type AdFormat = 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';

interface AdUnitProps {
    slotId?: string;
    format?: AdFormat;
    layoutKey?: string;
    className?: string;
    responsive?: boolean;
    style?: React.CSSProperties;
    label?: string;
    testMode?: boolean;
}

export default function AdUnit({
    slotId,
    format = 'auto',
    layoutKey,
    className,
    responsive = true,
    style,
    label = 'Advertisement',
    testMode = false, // Set to true to force placeholder
}: AdUnitProps) {

    useEffect(() => {
        // This is where the AdSense push would happen
        // (window.adsbygoogle = window.adsbygoogle || []).push({});
        try {
            if (!testMode && slotId && typeof window !== 'undefined') {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, [slotId, testMode]);

    // Dimensions hint for placeholders
    let minHeight = '100px';

    if (format === 'rectangle') {
        minHeight = '250px';
    } else if (format === 'vertical') {
        minHeight = '600px';
    } else if (format === 'horizontal') {
        minHeight = '90px';
    }

    // If no slotId is provided or in test mode, show a placeholder
    if (!slotId || testMode) {
        return (
            <div
                className={cn(
                    "bg-muted/30 border border-border rounded-lg p-4 flex flex-col items-center justify-center text-center overflow-hidden my-6 mx-auto",
                    className
                )}
                style={{ ...style, minHeight }}
            >
                <span className="text-[10px] uppercase font-mono text-muted-foreground mb-2 tracking-widest opacity-70">
                    {label}
                </span>
                <div
                    className="w-full h-full bg-muted/50 rounded flex items-center justify-center border border-dashed border-border/50"
                    style={{ minHeight: 'calc(100% - 24px)' }}
                >
                    <span className="font-semibold text-muted-foreground/40 text-sm">
                        Ad Space ({format})
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("ad-container my-6 mx-auto text-center", className)} style={style}>
            <div className="text-[10px] uppercase font-mono text-muted-foreground mb-1 tracking-widest opacity-50">
                {label}
            </div>
            <ins
                className="adsbygoogle block"
                style={{ display: 'block', ...style }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual ID or config
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
                data-ad-layout-key={layoutKey}
            />
        </div>
    );
}
