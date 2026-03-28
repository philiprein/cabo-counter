const Header = () => {
  return (
    <header className='bg-white border-b-4 border-cabo-black'>
      <div className='flex items-center justify-center gap-3 py-4 md:py-6'>
        <span className='text-5xl md:text-7xl cabo-title'>Cabo</span>
        <span className='md:text-xl font-bold text-cabo-black/40 uppercase'>
          Counter
        </span>
      </div>
    </header>
  );
};

export default Header;
