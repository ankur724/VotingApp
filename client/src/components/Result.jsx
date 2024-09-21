// /* eslint-disable no-unused-vars */


const Result = () => {
   
    return (
        <main style={mainStyle}>
            
            <div style={rightContainerStyle}>
      
                <h1 style={titleStyle}>Voting Result</h1>
                   
                
            </div>
        </main>
    );
};

const mainStyle = {
   
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', 
    backgroundColor: 'black',
    color: 'white',
    width: 'auto',  
    height: '100vh' 
};

const titleStyle = {
    fontSize: '3rem',
    display:'flex',
    justifyContent: 'center',
    // alignItems: 'flex-start',
    marginBottom: '20px',
    fontFamily: '"Gupter", serif',  
    fontWeight: 700,  
    fontStyle: 'normal', 

};


const rightContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 50px',
};





export default Result;
