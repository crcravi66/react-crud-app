import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {

    return (
        <header className="bg-blue-600">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-white text-2xl font-bold">My CRUD App</h1>
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
