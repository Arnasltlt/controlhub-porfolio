import Link from "next/link";
import styles from "./page.module.css";

interface PortfolioItemProps {
  title: string;
  description: string;
  href: string;
  status: 'ready' | 'coming-soon';
  icon: string;
}

function PortfolioItem({ title, description, href, status, icon }: PortfolioItemProps) {
  return (
    <div className={styles.portfolioItem}>
      <div className={styles.portfolioIcon}>{icon}</div>
      <div className={styles.portfolioContent}>
        <h2>{title} {status === 'coming-soon' && <span className={styles.comingSoon}>Coming Soon</span>}</h2>
        <p>{description}</p>
        {status === 'ready' ? (
          <Link href={href} className={styles.portfolioLink}>
            View Demo
          </Link>
        ) : (
          <span className={styles.disabledLink}>View Demo</span>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const portfolioItems: PortfolioItemProps[] = [
    {
      title: "Control Hub",
      description: "A centralized internal tool platform that unified scattered internal tools, creating a single access point for critical workflows. Features universal search and integrated tooling.",
      href: "/control-hub",
      status: "ready",
      icon: "⌂"
    },
    {
      title: "Supplier Hub",
      description: "An integrated platform for managing suppliers, tracking capabilities, and streamlining the supplier onboarding process.",
      href: "/supplier-hub",
      status: "coming-soon",
      icon: "⊕"
    },
    {
      title: "Zip File Uploader",
      description: "A specialized tool for batch uploading and processing manufacturing files with automated validation and error handling.",
      href: "/zip-uploader",
      status: "coming-soon",
      icon: "📦"
    },
    {
      title: "Quote Builder",
      description: "An interactive tool for creating customized quotes for manufacturing services with real-time pricing and feasibility feedback.",
      href: "/quote-builder",
      status: "coming-soon",
      icon: "💰"
    }
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Portfolio Visualizations</h1>
        <p>Interactive demos of key product management projects I've worked on</p>
      </header>
      
      <main className={styles.portfolioGrid}>
        {portfolioItems.map((item) => (
          <PortfolioItem
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            status={item.status}
            icon={item.icon}
          />
        ))}
      </main>
    </div>
  );
}
