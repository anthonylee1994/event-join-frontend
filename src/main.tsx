import ReactDOM from "react-dom/client";
import "./index.css";
import {App} from "./app.tsx";
import {WebAppProvider} from "@vkruglikov/react-telegram-web-app";
import {ChakraProvider} from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <WebAppProvider options={{smoothButtonsTransition: true}}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </WebAppProvider>
);
