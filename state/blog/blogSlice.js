import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch blog posts
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
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

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogPosts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        // Filter blog type posts, sort by ID in descending order, then reverse the array
        state.blogPosts = action.payload
          .filter((blog) => blog.type === 'blog')
          .sort((a, b) => b.id - a.id);
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;