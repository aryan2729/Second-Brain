import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface CardType {
  _id: string;
  title: string;
  text : string ;
  type: "youtube" | "twitter" | "document" | "github";
  link: string;
}

export function useCards(token: string | null) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFirstLoad = useRef(true);

  // Fetch cards function (memoized)
  const refreshCards = useCallback(() => {
    if (!token) return;
    if (isFirstLoad.current) setLoading(true);
    axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: { Authorization: token }
    })
      .then(res => {
        setCards((res as any).data.content);
        if (isFirstLoad.current) {
          setLoading(false);
          isFirstLoad.current = false;
        }
      })
      .catch(() => {
        setError("Failed to fetch cards");
        if (isFirstLoad.current) {
          setLoading(false);
          isFirstLoad.current = false;
        }
      });
  }, [token]);


  useEffect(() => {
    refreshCards();
    const interval = setInterval(refreshCards, 2000); 
    return () => clearInterval(interval);
  }, [refreshCards]);

  const deleteCard = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: token },
        data: { contentId: id }
      } as any);
      setCards(cards => cards.filter(card => card._id !== id));
    } catch {
      setError("Failed to delete card");
    }
  };

  return { cards, loading, error, deleteCard, refreshCards };
}