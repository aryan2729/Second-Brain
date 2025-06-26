import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/shareIcon'
import { Sidebar } from '../components/Sidebar'
import axios from 'axios'
import { BACKEND_URL, SITE_URL } from '../config'
import { useParams } from 'react-router-dom'

export function Share() {
  const { shareId } = useParams();
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSharedContent() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        setContents(response.data.content || []);
        setUsername(response.data.username || "");
      } catch (err) {
        setError("Invalid or expired share link.");
      }
      setLoading(false);
    }
    if (shareId) fetchSharedContent();
  }, [shareId]);

  if (loading) return <div>Loading shared content...</div>;
  if (error) return <div>{error}</div>;

  return <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">{username ? `${username}'s Shared Content` : "Shared Content"}</h2>
    <div className='flex gap-5 flex-wrap'>
      {contents.length === 0 && <div>No content found.</div>}
      {contents.map(({ _id, title, type, link, text }, idx) => (
        <Card key={_id || idx} id={_id} title={title} type={type} link={link} text={text} />
      ))}
    </div>
  </div>
}

