const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;

export interface MatchData {
  id: string;
  series: string;
  team1: string;
  team2: string;
  score1?: string;
  score2?: string;
  status: string;
  isLive: boolean;
}

export const fetchIPLMatches = async (): Promise<MatchData[]> => {
  if (!API_KEY || !API_HOST) return [];

  const url = `https://${API_HOST}/matches/v1/list?type=live`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    // Cricbuzz API structure check: result.typeMatches usually contains match types
    // We look for matches where series info contains "IPL"
    const matches: MatchData[] = [];
    
    if (result.typeMatches) {
      result.typeMatches.forEach((typeMatch: any) => {
        typeMatch.seriesMatches?.forEach((seriesMatch: any) => {
          if (seriesMatch.seriesAdWrapper) {
            const seriesName = seriesMatch.seriesAdWrapper.seriesName;
            if (seriesName.toLowerCase().includes("ipl") || seriesName.toLowerCase().includes("indian premier league")) {
              seriesMatch.seriesAdWrapper.matches?.forEach((match: any) => {
                matches.push({
                  id: match.matchInfo.matchId.toString(),
                  series: seriesName,
                  team1: match.matchInfo.team1.teamName,
                  team2: match.matchInfo.team2.teamName,
                  score1: match.matchScore?.team1Score?.inngs1?.runs 
                    ? `${match.matchScore.team1Score.inngs1.runs}/${match.matchScore.team1Score.inngs1.wickets}`
                    : "0/0",
                  score2: match.matchScore?.team2Score?.inngs1?.runs
                    ? `${match.matchScore.team2Score.inngs1.runs}/${match.matchScore.team2Score.inngs1.wickets}`
                    : "0/0",
                  status: match.matchInfo.status,
                  isLive: match.matchInfo.state === "In Progress" || match.matchInfo.state === "live"
                });
              });
            }
          }
        });
      });
    }

    return matches;
  } catch (error) {
    console.error("Error fetching IPL matches:", error);
    return [];
  }
};
