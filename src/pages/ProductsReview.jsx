
import React, { useState } from 'react';

function ProductReviews({ sku, reviews, averageRating }) {
  const [sortBy, setSortBy] = useState('recent');
  
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    if (sortBy === 'highest') return b.rating - a.rating;
    return a.rating - b.rating;
  });

  return (
    <section className="border-t border-zinc-200 pt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-zinc-900">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-zinc-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <div className="text-sm text-zinc-500 mt-1">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-zinc-300 rounded-lg text-sm"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b border-zinc-100 pb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-zinc-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Verified Purchase
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-zinc-900">{review.title}</h3>
              </div>
              <span className="text-sm text-zinc-500">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            
            <p className="text-zinc-700 mb-3">{review.comment}</p>
            
            {review.images.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Review"
                    className="w-20 h-20 object-cover rounded-lg border border-zinc-200 cursor-pointer"
                    onClick={() => window.open(img, '_blank')}
                  />
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">By {review.customerName}</span>
              <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                </svg>
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-zinc-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <h3 className="text-lg font-semibold text-zinc-600 mb-2">No reviews yet</h3>
          <p className="text-zinc-500">Be the first to review this product</p>
        </div>
      )}
    </section>
  );
}

export default ProductReviews;