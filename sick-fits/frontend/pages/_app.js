
import App, { Container} from 'next/app';
// import OurPage from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

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
                <div>

                            <Component {...pageProps} />
                </div>
            
                </ApolloProvider>
            </Container>
           
            
            
        );
    }
};

export default withData(MyApp);

/* <Container>
<ApolloProvider client={apollo}>
    <Page>

    </Page>
                </ApolloProvider>
            </Container> */

/* <ApolloProvider client={apollo}> */

/* <Container>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
            </Container> */


    // {/*Wrap entire app in ApolloProvider, so that entire app has access to apollo data*/}

    // render() {
    //     const { Component, apollo, pageProps } = this.props;
    //     return (
    //         <Container>
    //             <ApolloProvider client={apollo}>
    //                 <Page>
    //                     <Component {...pageProps} />
    //                 </Page>
    //             </ApolloProvider>
    //         </Container>
    //     );
    // }