import Layout from "../components/Layout/Layout";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";
import useNoteStore from "../store/NoteStore";

const Notes = () => {
   
   const [activeContent, setActiveContent] = useState('');
   const [activeTitle, setActiveTitle] = useState('');

   const activeNote = useNoteStore((state) => state.activeNote);
   const userNotes = useNoteStore((state) => state.notes);
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
            
               await noteStore.updateNote({...activeNote, htmlContent: activeContent});
           }
       }

         const onTitleChange = async () => {
            if(activeNote && activeTitle !== activeNote.title){
                await noteStore.updateNote({...activeNote, title: activeTitle});
            }

         };

    return ( 
        <>
             <Layout pageMode="notes">
                {userNotes?.length > 0 ? 
                    <Editor setActiveContent={setActiveContent} setActiveTitle={setActiveTitle} activeTitle={activeTitle}/> : "No notes available. Please create a note to get started."}
             </Layout>
        </>
     );
}

export default Notes;