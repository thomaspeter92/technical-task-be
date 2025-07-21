import HeaderImage from "./assets/discover-journey-maze.svg";
import Card from "./components/Card";
import ClipboardIcon from "./assets/clipboard-question.svg";
import TimerIcon from "./assets/stopwatch.svg";
import AdviceIcon from "./assets/scissor-cutting.svg";
import Quiz from "./components/Quiz";
import { useQuery } from "@tanstack/react-query";
import { getQuizResults } from "./api/quiz";
import { useNavigate, useSearchParams } from "react-router";
import Results from "./components/Results";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["quiz-result", searchParams.get("user") || ""],
    queryFn: () => getQuizResults(searchParams.get("user") || ""),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <>
      <header className="bg-slate-100 relative h-72 flex items-end">
        <img
          src={HeaderImage}
          alt="Discover journey image"
          className="absolute fit-cover w-full h-full object-cover z-0"
        />
        <div className="z-10 relative container max-w-7xl px-8 mx-auto my-10 space-y-5">
          <h1 className="text-4xl font-bold">Career Path Test</h1>
          <p>Discover careers that match your skills and personality</p>
        </div>
      </header>
      <main className="container max-w-7xl px-8 mx-auto my-10 space-y-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          <Card
            title="24 Questions"
            text="Answer 24 questions about your working style and career preferences."
            icon={ClipboardIcon}
            color="orange"
          />
          <Card
            title="2 Minutes"
            text="Gain insights into your future career in just two minutes."
            icon={TimerIcon}
            color="purple"
          />
          <Card
            title="Peronalised advice"
            text="Receive personalised advice to guide you on your next steps."
            icon={AdviceIcon}
            color="yellow"
          />
        </div>

        <div className="space-y-5">
          <p>
            We've analysed data from thousands of our members who work in
            graduate roles across a range of sectors to understand which
            personalities, skills and values best fit each career path.
          </p>
          <p>
            Take this test to understand what career path you might be suited to
            and how to get started.
          </p>
        </div>

        <div>
          {!searchParams.get("user") ? (
            <div>
              <p className="font-bold">No user detected</p>
              <p>Please enter a username to begin the quiz:</p>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                className="border block px-5 py-2 rounded border-slate-300 mb-2"
              />

              <Button
                onClick={() => {
                  navigate(`?user=${username}`);
                }}
              >
                Begin Quiz
              </Button>
            </div>
          ) : data?.latestSubmission ? (
            <Results date={data.latestSubmission} />
          ) : (
            <Quiz />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
