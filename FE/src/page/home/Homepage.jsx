import Story from "../../components/Story";
import useUsers from "../../hooks/useUsers";
import Aside from "./Aside";
import MainContent from "./MainContent";

const Homepage = () => {
  const user = useUsers();

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex flex-1 justify-center">
        <main className="w-full max-w-157.5 py-8 px-4">
          <Story />
          <div className="mt-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <MainContent key={index} />
            ))}
          </div>
        </main>

        <Aside user={user} />
      </div>
    </div>
  );
};

export default Homepage;
