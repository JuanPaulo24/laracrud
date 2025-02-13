import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import RouteList from "./RouteList";

const queryClient = new QueryClient();

const Routers = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <RouteList />
            </Router>
        </QueryClientProvider>
    );
};

export default Routers;

createRoot(document.getElementById("root")).render(<Routers />);
