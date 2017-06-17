var n_home=document.getElementById('home');
var n_blog=document.getElementById('blog');
var n_project=document.getElementById('project');
function disappear()
{
	n_blog.style.display='none';
	n_project.style.display='none';
	n_home.style.display='none';

}
function dis()
{
	disappear();


}
function project()
{
	disappear();
	n_project.style.display='block';
	
}
function blog()
{
	disappear();
	n_blog.style.display='block';

}
function home()
{
	disappear();
	n_home.style.display='block';

}
disappear();
home();