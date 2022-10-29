import Logo from './icons/Logo';

const Heading = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-2 mb-10">
      <Logo className="w-40" />
      <h1 className="font-bold text-2xl italic">Hotspot Configurator</h1>
    </div>
  );
};

export default Heading;
