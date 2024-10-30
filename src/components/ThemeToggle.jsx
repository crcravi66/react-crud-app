import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const backgroundStyle =
        theme === "light"
            ? {
                color: "white",
                borderColor: "white",
                boxShadow: "1px 10px 80px 0px white",
                backgroundImage: " linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
            }
            : {
                backgroundImage: "radial-gradient(circle at 50% 50%, #95afbb, #9dbac5, #a5c5cf, #aed1d9, #b7dce2, #c0e8ec, #c9f3f5, #d3fffe)",
                boxShadow: "2px 10px 80px 1px black",
                color: "black",
                borderColor: "black",

            };
    return (
        <>
            <button className='sm:px-3 sm:py-2 px-2 py-2 text-xs sm:text-sm border-2 rounded-md m-1' style={backgroundStyle} onClick={toggleTheme}>
                {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </>
    );
};

export default ThemeToggle;
