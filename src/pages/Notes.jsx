import Layout from "../components/Layout/Layout";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import useNoteStore from "../store/NoteStore";

const Notes = () => {
   
   const [activeContent, setActiveContent] = useState('');
   const [activeTitle, setActiveTitle] = useState('');
   const [activeDate, setActiveDate] = useState('');

   const activeNote = useNoteStore((state) => state.activeNote);
   const noteStore = useNoteStore();


   // debounce logic for saving note, so it doesn't call the api on every keystroke
       useEffect(() => {
           const delayDebounceFn = setTimeout(() => {
               if(activeContent !== ''){
                   onContentChange();
               }
           }, 1000);
   
           return () => clearTimeout(delayDebounceFn);
       }, [activeContent]);

       useEffect(() => {
           const delayDebounceFn = setTimeout(() => {
               if(activeTitle !== ''){
                   onTitleChange();
               }
           }, 1000);
   
           return () => clearTimeout(delayDebounceFn);
       }, [activeTitle]);
       
       const onContentChange = async () => {
           if(activeNote && activeContent !== activeNote.htmlContent){
               await noteStore.updateNote({...activeNote, htmlContent: activeContent, updatedAt: new Date().toISOString()});
               setActiveDate(activeNote.updatedAt);
           }
       }

         const onTitleChange = async () => {
            if(activeNote && activeTitle !== activeNote.title){
                await noteStore.updateNote({...activeNote, title: activeTitle});
            }

         };

    return ( 
        <>
             <Layout PageMode="notes">
                <Editor setActiveContent={setActiveContent} setActiveTitle={setActiveTitle} activeTitle={activeTitle} activeDate={activeDate} setActiveDate={setActiveDate}/>
             </Layout>
        </>
     );
}

export default Notes;