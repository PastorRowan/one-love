
/*
    File: src/Main.js
    Description:
        Component serves as the main content area of the application, organizing and rendering key components related to search functionality and playlist management.

        - Imports:
        - `styles` from `Main.module.css` for styling the component.
        - `SearchContainer`, `SearchTracksCont`, and `PlaylistTracksCont` components.

        - `Main` Component:
            - Renders the main content of the application.
            - Uses CSS modules for styling.
            - Includes:
                - `SearchContainer`: Presumably for searching tracks.
                - A container (`functionBlock`) that wraps:
                - `SearchTracksCont`: Displays search results for tracks.
                - `PlaylistTracksCont`: Displays the user's playlist of tracks.

        - Layout:
            - The `main` element is styled with a class from `Main.module.css`.
            - The `functionBlock` class contains the layout for search and playlist functionalities.
*/

// CSS
import styles from './Main.module.css';

//components
import SearchContainer from './components/SearchContainer/SearchContainer';
import SearchTracksCont from './components/SearchTracksCont/SearchTracksCont';
import PlaylistTracksCont from './components/PlaylistTracksCont/PlaylistTracksCont';

function Main() {
    return (
        <main className={styles.main}>
          	<SearchContainer />
          	<div className={styles.functionBlock}>
          		<div className={styles.functionContainer}>
            		<SearchTracksCont />
            	</div>
            	<PlaylistTracksCont/>
          	</div>
    	</main>
    );
};

export default Main;
