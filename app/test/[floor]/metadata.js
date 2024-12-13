export async function getStaticPaths() {
    const paths = Object.keys(floorData).map((floor) => ({
      params: { floor },
    }));
    return { paths, fallback: false };
  }
  
  export async function getStaticProps({ params }) {
    const currentFloor = floorData[params.floor] || floorData['valley-floor-1'];
    return { props: { currentFloor } };
  }