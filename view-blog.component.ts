import { Component, OnInit, Input } from "@angular/core";
import { BlogService } from "src/services/blog.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { userDetails } from "src/app/models/user.model";
import { UserDetailService } from "src/services/user-details.service";
import { Router } from "@angular/router";
import { blogDetails } from "src/app/models/blog.model";

@Component({
  selector: "app-view-blog",
  templateUrl: "./view-blog.component.html",
  styleUrls: ["./view-blog.component.css"],
})
export class ViewBlogComponent implements OnInit {
  urlName = "";
  blogId = "";
  comment = "<h1>Hello</h1><p>Just Checking</p>";

  userDetail: {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    permission: string;
    bio1: string;
    bio2: string;
    bio3: string;
    address: string;
    city: string;
    state: string;
    profilepicFilepath: string;
  };

  blog: {
    title: string;
    date: number;
    content: string;
    creator: string;
    blogImagepath: string;
    userDetail: {
      id: string;
      full_name: string;
      email: string;
      phone_number: string;
      permission: string;
      bio1: string;
      bio2: string;
      bio3: string;
      address: string;
      city: string;
      state: string;
      profilepicFilepath: string;
    };
  };

  constructor(
    private blogservice: BlogService,
    public route: ActivatedRoute,
    private userService: UserDetailService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.userDetail = this.userService.getUserDetails();
    // console.log(this.userDetail);

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has("blogId")) {
        this.blogId = params.get("blogId");
      }
    });

    this.blogservice.getSingleBlog(this.blogId).subscribe((res) => {
      console.log((res as any).blogs[0]);
      this.blog = (res as any).blogs[0];
      console.log(this.blog.creator);
    });

    this.blogservice.getauthordetails(this.blog.creator).subscribe((res) => {
      this.userDetail = (res as any).userDetails[0];
    });

    this.userService.getProfileDetails(this.urlName).subscribe((res) => {
      this.userDetail = (res as any).userDetails;
      console.log(this.userDetail);
    });
  }

  getDate(date: number) {
    const dateFormatted = new Date(date).toString().split(" ");
    const dateResult =
      "Posted on " +
      dateFormatted[1] +
      " " +
      dateFormatted[2] +
      ", " +
      dateFormatted[3];
    return dateResult;
  }

  getImageUrl(imageUrl) {
    if (!imageUrl || imageUrl === "empty") {
      return "../../../assets/images/blog_demo.jpg";
    } else {
      return imageUrl;
    }
  }

  // getImageUrl_profile(imageUrl) {
  //   if (imageUrl === "empty") {
  //     return "../../../assets/images/empty-profile.png";
  //   } else {
  //     return imageUrl;
  //   }
  // }

  getImageUrl_profile(imageUrl) {
    if (!imageUrl || imageUrl === "empty") {
      return "../../../assets/images/empty-profile.png";
    } else {
      return imageUrl;
    }
  }

  btnClick() {
    this.router.navigateByUrl("/blog-page");
  }
}
