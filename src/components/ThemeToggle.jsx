import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const backgroundStyle =
        theme === "light"
            ? {
                color: "white",
                borderColor: "white",
                boxShadow: "1px 1px 1px 0px white",
                backgroundImage: " linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
            }
            : {
                backgroundImage: "radial-gradient(circle at 50% 50%, #95afbb, #9dbac5, #a5c5cf, #aed1d9, #b7dce2, #c0e8ec, #c9f3f5, #d3fffe)",
                boxShadow: "2px 5px 11px 1px black",
                color: "black",
                borderColor: "black",

            };
    return (
        <>
            <button className='px-3 py-2 border-2 rounded-md m-1' style={backgroundStyle} onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </>
    );
};

export default ThemeToggle;
