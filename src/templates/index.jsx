import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import PaginatedContent from "../layouts/PaginatedContent/PaginatedContent";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

class Index extends React.Component {
  render() {
    const {
      nodes,
      page,
      pages,
      total,
      limit,
      prev,
      next
    } = this.props.pathContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const fileEdges = this.props.data.allFile.edges;
    return (
      <div className="index-container">
        <Helmet>
          <title>{config.siteTitle}</title>
          <link rel="canonical" href={`${config.siteUrl}`} />
        </Helmet>
        <SEO postEdges={postEdges} />

        <PaginatedContent page={page} pages={pages} total={total} limit={limit} prev={prev} next={next}>
          <PostListing postEdges={nodes} fileEdges={fileEdges} />
        </PaginatedContent>
      </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allFile {
      edges {
        node {
          id
          absolutePath
          childImageSharp {
            id
            resolutions {
              base64
              tracedSVG
              aspectRatio
              width
              height
              src
              srcSet
              srcWebp
              srcSetWebp
              originalName
            }
            internal {
              contentDigest
              type
              owner
            }
            sizes(maxWidth: 1240) {
              ...GatsbyImageSharpSizes
              originalName
            }
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
