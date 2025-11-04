interface CategoryBannerProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export default function CategoryBanner({ image, imageAlt, title, description }: CategoryBannerProps) {
  return (
    <section className="relative h-[40vh] min-h-[300px] max-h-[500px] w-full overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
      
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}
