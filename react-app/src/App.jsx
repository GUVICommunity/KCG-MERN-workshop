import React from 'react';

function App() {
    const [count, setCount] = React.useState(0);
    return (
        <>
            <button
                onClick={() => {
                    setCount((state) => (state += 1));
                }}>
                Add {count}
            </button>
        </>
    );
}

export default App;
