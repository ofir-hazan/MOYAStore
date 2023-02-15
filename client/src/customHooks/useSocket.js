import { useContext } from "react";
import { SocketContext } from "../Contexts/SocketContext";

const useSocket = () => useContext(SocketContext);

export default useSocket;