import '../../styles/desktop.scss'

interface Props {
    currentFocus: string;
    inputRef: React.RefObject<HTMLInputElement>;
    allFiles: any;
    setAllFiles: any;
}

export default function IconOptions({
    currentFocus,
    inputRef,
    allFiles,
    setAllFiles
}: Props) {

    const renameIcon = async (name: string) => {
        let inputTimer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 10)
        let nameIndex = allFiles.map((icon: any) => {
            if (name === icon.name) {
                return { ...icon, rename: true }
            } else {
                return { ...icon, rename: false }
            }
        })
        setAllFiles(nameIndex);
        return () => clearTimeout(inputTimer);
    }

    const deleteIcon = (name: string) => {
        let newList = allFiles.filter((icon: any) => icon.name !== name);
        setAllFiles(newList);
    }

    const openIcon = (name: string) => {
        let nameIndex = allFiles.map((icon: any) => {
            if (name === icon.name) {
                return { ...icon, open: true }
            } else {
                return { ...icon, open: false }
            }
        })
        setAllFiles(nameIndex);
    }

    return (
        <div className="icon-options">
            <ul>
                <li onClick={() => openIcon(currentFocus)}>Open</li>
                <li onClick={() => renameIcon(currentFocus)}>Rename</li>
                <li onClick={() => deleteIcon(currentFocus)}>Delete</li>
            </ul>
        </div>
    )
}