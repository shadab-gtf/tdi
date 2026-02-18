"use client";

import { useEffect } from "react";
import { initGlobalPAnimation } from "@/lib/gsapGlobal";

const GlobalAnimation = () => {

    useEffect(() => {

        initGlobalPAnimation();

    }, []);

    return null;
};

export default GlobalAnimation;
