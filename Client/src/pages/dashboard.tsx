import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/shareIcon'
import { Sidebar } from '../components/Sidebar'
import axios from 'axios'
import { BACKEND_URL, SITE_URL } from '../config'
import { useCards } from '../hooks/useCards'

export function Dashboard() {
  const [modalOpen , setModalOpan] = useState(false);
  const token = localStorage.getItem("token");
  const { cards, loading, error, deleteCard } = useCards(token);
  const [search, setSearch] = useState("");
  
  const [typeFilter , setTypeFilter] = useState<string | null>(null);  
  const filteredCards = cards.filter(card => {
    const matchesType = !typeFilter || card.type === typeFilter;
    const matchesSearch = card.title.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });


  const [shareLink, setShareLink] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);



  useEffect(() => {
    async function fetchShareStatus() {
      try {

        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/share`, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
        if (response.data.hash) {
          setShareLink(`${SITE_URL}/share/${response.data.hash}`);
        } else {
          setShareLink(null);
        }
      } catch {
        setShareLink(null);
      }
    }
    fetchShareStatus();
  }, []);



  async function handleShareOn() {
    setShareLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      setShareLink(`${SITE_URL}/share/${response.data.hash}`);
    } finally {
      setShareLoading(false);
    }
  }


  async function handleShareOff() {
    setShareLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: false }, {
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      setShareLink(null);
    } finally {
      setShareLoading(false);
    }
  }
    


  return <div>

      <Sidebar setTypeFilter={setTypeFilter}/>
    
      <div className='bg-grayScreen min-h-screen p-4 ml-72 border-2'>
        
        <CreateContentModal open={modalOpen} onClose={()=>{ setModalOpan(false); }} />
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Button onClick={() => { setModalOpan(true); }} variant='secondary' text='Add content' startIcon={ < PlusIcon />} />
          {shareLink ? (
            <>
              <Button onClick={handleShareOff} variant='primary' text='Stop sharing' startIcon={<ShareIcon />} loading={shareLoading} />
              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded shadow border text-sm max-w-full overflow-x-auto">
                <span>Share link:</span>
                <a href={shareLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline truncate max-w-[200px]">{shareLink}</a>
                <Button onClick={() => {navigator.clipboard.writeText(shareLink)}} variant='secondary' text='Copy' />
              </div>
            </>
          ) : (
            <Button onClick={handleShareOn} variant='primary' text='Share brain' startIcon={<ShareIcon />} loading={shareLoading} />
          )}
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title"
          className="border rounded px-3 py-2 w-64 mb-4"
        />
        <div className='flex gap-5 flex-wrap'>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {filteredCards.map(card => (
            <Card
              key={card._id}
              id={card._id}
              title={card.title}
              type={card.type}
              link={card.link}
              text={card.text}
              onDelete={deleteCard}
            />
          ))}
        </div>
      </div>
  </div>
}

