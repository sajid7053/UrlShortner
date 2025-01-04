import React, {useState, useEffect} from 'react';

export function App(props) {
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [urlList, setUrlList] = useState([])

  useEffect(() => {

    savedUrls = localStorage.getItem('urlList') || [];
    setUrlList(savedUrls)
  },[])

  useEffect(() => {
    localStorage.setItem('urlList', (urlList))
  }, [urlList])

  const generateShortUrl = () => {
    if(!longUrl) {
      return;
    }

    const newShortUrl = `https://short.ly${Math.random().toString(36).slice(2,6)}`
    const newEntry = {longUrl, shortUrl: newShortUrl};
    setUrlList([newEntry, ...urlList])

    setShortUrl(newShortUrl)
    setLongUrl("")
  }

  return (
    <div className='App'>
      <h1>Url shortner app</h1>
      <div>
      <input 
      type="text" 
      placeholder="enter value" 
      value={longUrl}
      onChange={(e) => setLongUrl(e.target.value)} />
      </div>
      <button onClick={generateShortUrl}>short url</button>
      {shortUrl && (
        <div style={{marginTop: "40px"}}>
            <h3>shortened urls</h3>
            <a href={shortUrl} target="_blank"></a>
        </div>
      )}
      <div style={{marginTop: "40px"}}>
        <h3>previously shortened url</h3>
        <ul style={{listStyle: "none"}}>
        {urlList.map((url, index) => (
            <li key={index} style={{border: "1px solid #ccc", padding: "10px"}}>
                <p>
                    <strong>original</strong>
                    <a href={url.longUrl} target="_blank">
                        {url.longUrl}
                    </a>
                </p>
                <p>
                    <strong>shortened</strong>
                    <a href={url.shortUrl}>{url.shortUrl}</a>
                </p>
            </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

