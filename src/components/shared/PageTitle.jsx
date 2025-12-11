import { useEffect } from "react";
import { useLocation } from "react-router";

const PageTitle = ({ title, children }) => {
    const location = useLocation();

    useEffect(() => {
        document.title = `${title} | Blood Line`;
    }, [location, title]);

    return children;
};

export default PageTitle;
