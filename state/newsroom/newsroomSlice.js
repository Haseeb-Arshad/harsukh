import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch blog posts
export const fetchNews = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await fetch('https://almaymaar.rems.pk/api/blog', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer GjKnyjcXFImbsMxCMf0McLaQBmlHKMvGk9',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  const blogs = result.blogs || [];

  // Fetch descriptions for each blog post
  const enrichedBlogPosts = await Promise.all(
    blogs.map(async (blog) => {
      const detailResponse = await fetch(`https://almaymaar.rems.pk/api/blog/${blog.slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer GjKnyjcXFImbsMxCMf0McLaQBmlHKMvGk9',
        },
      });

      if (!detailResponse.ok) {
        throw new Error(`HTTP error! status: ${detailResponse.status}`);
      }

      const blogDetails = await detailResponse.json();
      const fullDescription = blogDetails.blog.description;
      const strippedDescription = stripHTML(fullDescription);
      const excerpt = getExcerpt(strippedDescription);

      return {
        ...blog,
        description: fullDescription, // Full HTML description
        excerpt, // Excerpt (first two sentences)
      };
    })
  );

  return enrichedBlogPosts;
});

// Strip HTML helper function
const stripHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

// Get excerpt helper function
const getExcerpt = (text, limit = 2) => {
  const sentences = text.split('.').slice(0, limit).join('. ') + '.';
  return sentences;
};

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsPosts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsPosts = action.payload.filter((blog) => blog.type === 'news'); // Only store blog type
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
