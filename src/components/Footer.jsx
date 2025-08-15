import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Expense Tracker
          </span>
        </p>

        <div className="inline-flex gap-5 text-lg">
          <a
            className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            href="https://github.com/Sabuj-Chowdhury"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            href="https://www.linkedin.com/in/sabuj-chowdhury"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
