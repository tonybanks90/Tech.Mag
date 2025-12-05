import { Link } from 'wouter';
import { X, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    categories: any[];
    siteName: string;
    isActive: (path: string) => boolean;
    isLoading: boolean;
}

export default function MobileMenu({ isOpen, onClose, categories, siteName, isActive, isLoading }: MobileMenuProps) {

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                className={cn(
                    "fixed inset-0 z-[100] w-screen h-screen max-w-none p-0 gap-0 border-none bg-background/98 backdrop-blur-3xl rounded-none shadow-none flex flex-col",
                    // Reset default dialog animations and positioning
                    "translate-x-0 translate-y-0 top-0 left-0 right-0 bottom-0",
                    // Custom animations
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=open]:slide-in-from-right-[100%] data-[state=closed]:slide-out-to-right-[100%]",
                    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
                    "duration-300 ease-in-out",
                    // Background gradient
                    "bg-gradient-to-b from-background to-muted/20",
                    // Hide default Radix close button
                    "[&>button:last-child]:hidden"
                )}
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>Mobile Menu</DialogTitle>
                    <DialogDescription>Navigation options</DialogDescription>
                </DialogHeader>

                {/* Internal Header for the Overlay */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-border/50 bg-background/50 flex-shrink-0">
                    <Link href="/" className="flex-shrink-0" onClick={onClose}>
                        <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                            {siteName}
                        </h1>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="hover:bg-muted rounded-full"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <div className="space-y-2 flex-1">
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <div className="grid gap-2">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2 animate-in slide-in-from-bottom-2 fade-in-0 duration-500 delay-100 fill-mode-both">Menu</p>

                                {/* Home Link */}
                                <Link href="/">
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-start h-auto py-4 px-4 text-xl font-medium rounded-xl animate-in slide-in-from-bottom-3 fade-in-0 duration-500 fill-mode-both ${isActive('/') ? 'text-primary bg-primary/5' : 'text-foreground hover:bg-muted'}`}
                                        style={{ animationDelay: '100ms' }}
                                        onClick={onClose}
                                    >
                                        Home
                                    </Button>
                                </Link>

                                {categories?.map((category, idx) => (
                                    <Link key={category._id} href={`/category/${category.slug}`}>
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-between h-auto py-4 px-4 text-xl font-medium rounded-xl animate-in slide-in-from-bottom-3 fade-in-0 duration-500 fill-mode-both ${isActive(`/category/${category.slug}`)
                                                ? 'text-primary bg-primary/5'
                                                : 'text-foreground hover:bg-muted'
                                                }`}
                                            style={{ animationDelay: `${150 + (idx * 50)}ms` }}
                                            onClick={onClose}
                                        >
                                            {category.name}
                                            <ArrowRight className="h-5 w-5 opacity-30" />
                                        </Button>
                                    </Link>
                                ))}

                                <div className="my-4 h-px bg-border/50 animate-in fade-in-0 duration-700 delay-300 fill-mode-both" />

                                <Link href="/shop">
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-between h-auto py-4 px-4 text-xl font-medium rounded-xl animate-in slide-in-from-bottom-3 fade-in-0 duration-500 fill-mode-both ${isActive('/shop')
                                            ? 'text-primary bg-primary/5'
                                            : 'text-foreground hover:bg-muted'
                                            }`}
                                        style={{ animationDelay: '300ms' }}
                                        onClick={onClose}
                                    >
                                        Shop
                                        <ArrowRight className="h-5 w-5 opacity-30" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="pt-8 mt-auto flex-shrink-0 animate-in slide-in-from-bottom-6 fade-in-0 duration-700 delay-500 fill-mode-both">
                        <Button className="w-full h-14 text-lg font-bold shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl" onClick={onClose}>
                            Subscribe Now
                        </Button>
                        <div className="flex justify-center gap-6 mt-8 pb-8 safe-area-bottom">
                            <span className="text-sm text-muted-foreground font-medium">© 2025 {siteName}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
