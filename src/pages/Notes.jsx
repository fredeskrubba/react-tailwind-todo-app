import Layout from "../components/Layout/Layout";
import Editor from "../components/Editor";

const Notes = () => {
    return ( 
        <>
             <Layout PageMode="notes">
                <Editor/>
             </Layout>
        </>
     );
}

export default Notes;