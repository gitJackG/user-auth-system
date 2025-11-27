import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../lib/api";

export const SESSIONS = "sessions";

const useSessions = (opts: any = {}) => {
  const { data: sessions = [], ...rest } = useQuery({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...opts,
  });

  return { sessions, ...rest };
};
export default useSessions;