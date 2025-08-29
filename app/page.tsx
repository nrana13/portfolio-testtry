import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I’m Nikki Rana, born and raised in Cambridge, and now studying Systems Design Engineering at the University of Waterloo. 
        My focus is on human factors — the intersection of product, design, and how people actually experience technology. 
        I like thinking about the small details that make things easier to use and the bigger picture of how design shapes our lives.
Outside of school, I’ve helped organize two coding competitions, mentored in a handful of different programs, and spoken on a few panels. 
When I’m not doing something vaguely productive, I’m usually annoying my older siblings or experimenting in the kitchen — cooking is my favorite way to unplug.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
