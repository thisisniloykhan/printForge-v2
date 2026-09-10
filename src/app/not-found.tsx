import NavLink from "./components/NavLink";

export default function NotFound() {
  return (
    <div className="border flex flex-1 flex-col gap-5 justify-center items-center text-center">
      <h2 className="font-bold text-2xl xxs:text-3xl sm:text-4xl md:text-5xl">
        Page Not Found!
      </h2>
      <p className="text-sm xs:text-lg sm:text-xl">
        Could not find requested resource
      </p>
      <NavLink
        href="/"
        className="px-2 py-1 sm:px-6 sm:py-3 text-foreground transition
                font-semibold
                duration-100 bg-background border-2 border-foreground hover:bg-foreground "
      >
        Return Home
      </NavLink>
    </div>
  );
}
