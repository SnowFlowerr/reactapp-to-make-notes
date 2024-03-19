import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar({ note, setNote, arrNotes, setArrNotes }) {
    const [add, setAdd] = useState(true);
    const [search, setSearch] = useState(false);
    const [searchInp, setSearchInp] = useState({text:"",count:true});
    const [searchArr, setSearchArr] = useState([]);
    const [update, setUpdate] = useState({ state: false, index: -1 });
    const success = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const warning = (message) => {
        toast.warning(message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    function handleaddInput(e) {
        e.preventDefault();
        setAdd(true)
        setSearch(false);
        handleCancel(e)
    }
    function handleChange(e) {
        e.preventDefault();
        setNote({ ...note, [e.target.id]: e.target.value })
    }
    function handleClick(e) {
        e.preventDefault();
        if (note.title.trim() !== "") {
            setArrNotes([note, ...arrNotes])
            setNote({ title: "", text: "" })
            allWhite()
            setUpdate({ state: false, index: update.index })
        }
        else {
            warning("Enter the Title")
        }
        // setAdd(false);
    }
    function handleDelete(index) {
        setArrNotes(arrNotes.filter((ele, ind) => ind !== index))
        setNote({ title: "", text: "" })
        setUpdate({ state: false, index: update.index })
        allWhite()
    }
    function handleDisplay(index) {
        setNote(arrNotes[index])
        setUpdate({ state: true, index: [index] })
        allWhite()
        document.getElementById(`${index}`).style.backgroundColor = "lightgreen";
    }
    function allWhite() {
        for (let i = 0; i < arrNotes.length; i++) {
            document.getElementById(`${i}`).style.backgroundColor = "white";
        }
    }
    function handleSearchChange(e) {
        e.preventDefault()
        setSearchInp( {text:e.target.value,count:searchInp.count})
    }
    function handleSearch(e) {
        e.preventDefault()
        if (searchInp.count===true) {
            if(searchInp.text.trim() !== ""){
                setSearchArr(arrNotes)
                setArrNotes(arrNotes.filter((ele) => ele.title.toLowerCase().trim().includes(searchInp.text.toLowerCase().trim())))
                setSearchInp({text:"",count:false})
            }
            else{
                warning(" Enter the Search Input")
            }
        }
        else{
            warning(" First click on clear")
        }
        // setSearchInp({text:"",count:1})
        // setSearch(false);
    }
    function handleSearchInput(e) {
        e.preventDefault()
        setSearch(true);
        setAdd(false)
    }
    function handleCancel(e) {
        e.preventDefault()
        if (searchInp.count===false) {
            setArrNotes(searchArr);
        }
        // setSearch(false);
        setSearchInp({text:"",count:true})
    }
    function handleUpdate(e) {
        e.preventDefault()
        if (note.title !== "") {
            arrNotes[update.index] = note;
            success("Note's Updated")
            // setNote({title:"",text:""})
            // setUpdate({state:false,index:update.index})
        }
        else {
            warning("Enter the Title")
        }
        // setArrNotes(arrNotes)
    }
    function handleClose(e) {
        e.preventDefault()
        setNote({ title: "", text: "" })
        setUpdate({ state: false, index: update.index })
        allWhite()
    }
    return (
        <div>
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
            <div className={styles.Navbox}>
                <div className={styles.addNotes}>Add Notes <button className={styles.addNotesBtn} onClick={handleaddInput}><i class="fa-solid fa-plus"></i></button><button className={styles.searchBtn} onClick={handleSearchInput}><i class="fa-solid fa-magnifying-glass"></i></button>
                    {add && (
                        <div className={styles.inputBox}>
                            <form >
                                <input type="text" placeholder=' Enter The Title' onChange={handleChange} value={note.title} id='title' />
                                <button onClick={handleClick} className={styles.btn}><i class="fa-solid fa-floppy-disk"></i></button>
                            </form>
                        </div>
                    )}
                    {search && (
                        <div className={styles.inputBox}>
                            <form >
                                <input type="text" placeholder=' Search' onChange={handleSearchChange} className={styles.search} value={searchInp.text} id='title' />
                                <button onClick={handleSearch} ><i class="fa-solid fa-magnifying-glass"></i></button>
                                <button onClick={handleCancel} ><i class="fa-solid fa-xmark"></i></button>
                            </form>
                        </div>
                    )}
                </div>
                <div className={styles.space}></div>
                <div className={styles.titlesBox}>
                    {arrNotes.map((element, index) => <div><button onClick={() => handleDisplay(index)} className={styles.titleBtn} id={`${index}`}>{element.title}</button> <button className={styles.deleteBtn} onClick={() => handleDelete(index)}><i class="fa-solid fa-trash"></i></button></div>)}
                </div>
            </div>
            {update.state && (
                <div className={styles.updateClose}>
                    <button className={styles.updateBtn} onClick={handleUpdate}>Update</button>
                    <button className={styles.closeBtn} onClick={handleClose}>Close</button>
                </div>)}
        </div>
    )
}