export const Footer = () => {
  return (
    <footer className="w-full text-center py-6 border-t mt-12">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold">jmsilva.dev</span> —{" "}
        <a 
          href="https://www.linkedin.com/in/jmsilva83" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary hover:underline transition-colors"
        >
          Desde Las Breñas para el mundo 🌎
        </a>
      </p>
    </footer>
  );
};
