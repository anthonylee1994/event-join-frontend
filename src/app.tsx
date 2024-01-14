import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./layout";
import {EventPage} from "./pages/events";
import moment from "moment";
import "moment/dist/locale/zh-hk";
import {useExpand, useWebApp} from "@vkruglikov/react-telegram-web-app";
import React from "react";

moment.locale("zh-hk");

export const App = () => {
    const [, setExpand] = useExpand();

    const webApp = useWebApp();
    console.log("webApp", webApp);

    React.useEffect(() => {
        webApp.setBackgroundColor("#e1f5fe");
        setExpand();
    }, [setExpand]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<EventPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
