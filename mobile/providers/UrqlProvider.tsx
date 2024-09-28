import React from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { SERVER_URL } from "@/constants";

const client = new Client({
  url: SERVER_URL,
  exchanges: [cacheExchange, fetchExchange],
});
const UrqlProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;
