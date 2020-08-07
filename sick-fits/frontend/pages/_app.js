
import App, { Container } from 'next/app';
import OurPage from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import Header from '../components/Header';

// Custom Nextjs App component.
class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);        
        }
        // Exposes the query to the user.
        pageProps.query = ctx.query;
        return { pageProps };
    }
    
    render() {
        console.log(this.props)
        const { Component, apollo, pageProps } = this.props;
        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <OurPage>
                        

                        <Component {...pageProps} />
                    </OurPage>
            
                </ApolloProvider>
            </Container>
        );
    }
};

export default withData(MyApp);