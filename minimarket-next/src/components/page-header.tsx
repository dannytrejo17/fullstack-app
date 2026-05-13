type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8 w-full">
      <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
          {description}
        </p>
      ) : null}
    </header>
  );
}
