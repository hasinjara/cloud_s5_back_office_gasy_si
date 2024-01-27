class ErrorManager   extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez également enregistrer l'erreur quelque part
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Afficher une interface de secours
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
