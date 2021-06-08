import Link from "next/link";

export default function CustomButton({
  theme = "primary",
  href = "/",
  extra,
  children,
}) {
  return (
    <Link href={href}>
      <a className={`btn btn-${theme} ${extra && extra}`}>{children}</a>
    </Link>
  );
}
