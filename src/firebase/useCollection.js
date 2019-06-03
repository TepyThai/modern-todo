import { useState, useEffect } from 'react';
import { db } from './firebase';

function useCollection(path, orderBy) {
  const [docs, setDocs] = useState([]);
  const [state, setState] = useState({ loading: true, error: false });

  useEffect(() => {
    setState({ loading: true, error: false });
    let collection = db.collection(path);
    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }
    if (!collection) {
      setState({ loading: false, error: true });
    }
    return collection.onSnapshot(snapShot => {
      const docs = [];
      snapShot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDocs(docs);

      setState({ loading: false, error: false });
    });
  }, [orderBy, path]);

  return [state, docs];
}

export default useCollection;
